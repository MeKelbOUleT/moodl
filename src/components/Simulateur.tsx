import { useState, useMemo } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SimulatorSlider from "@/components/SimulatorSlider";
import ResultCard from "@/components/ResultCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  Calendar, 
  Target,
  BarChart3,
  Home,
  Percent
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

const Simulateur = () => {
  const [moodlPrice, setMoodlPrice] = useState(55000);
  const [landPrice, setLandPrice] = useState(30000);
  const [works, setWorks] = useState(10000);
  const [deposit, setDeposit] = useState(25000);
  const [loanRate, setLoanRate] = useState(4.5);
  const [loanDuration, setLoanDuration] = useState(20);
  const [nightlyRate, setNightlyRate] = useState(150);
  const [occupancyRate, setOccupancyRate] = useState(70);
  const [dailyCharges, setDailyCharges] = useState(30);
  const [annualCharges, setAnnualCharges] = useState(2500);
  const [managementFees, setManagementFees] = useState(15);

  const calculations = useMemo(() => {
    const notaryFees = landPrice * 0.08;
    const totalCost = moodlPrice + landPrice + notaryFees + works;
    const loanAmount = totalCost - deposit;
    const monthlyRate = loanRate / 100 / 12;
    const numberOfPayments = loanDuration * 12;
    const monthlyPayment = loanAmount > 0 
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : 0;
    
    const nightsPerYear = Math.round((occupancyRate / 100) * 365);
    const annualRevenue = nightlyRate * nightsPerYear;
    const monthlyRevenue = annualRevenue / 12;
    const annualDailyCharges = dailyCharges * nightsPerYear;
    const totalAnnualCharges = annualDailyCharges + annualCharges;
    const managementFeesAmount = (annualRevenue * managementFees) / 100;
    const totalAnnualExpenses = totalAnnualCharges + managementFeesAmount + (monthlyPayment * 12);
    const monthlyExpenses = totalAnnualExpenses / 12;
    const monthlyCashflow = monthlyRevenue - monthlyExpenses;
    const annualCashflow = monthlyCashflow * 12;
    const grossYield = ((annualRevenue / totalCost) * 100);
    const netAnnualRevenue = annualRevenue - totalAnnualCharges - managementFeesAmount;
    const netYield = ((netAnnualRevenue / totalCost) * 100);
    const breakEvenNights = Math.ceil(
      (monthlyPayment * 12 + totalAnnualCharges + managementFeesAmount) / 
      (nightlyRate - dailyCharges)
    );
    const totalCashflow10Years = annualCashflow * 10;
    const roi10Years = ((totalCashflow10Years / deposit) * 100);
    
    return {
      notaryFees,
      totalCost,
      loanAmount,
      monthlyPayment,
      nightsPerYear,
      annualRevenue,
      monthlyRevenue,
      totalAnnualCharges,
      managementFeesAmount,
      totalAnnualExpenses,
      monthlyCashflow,
      annualCashflow,
      grossYield,
      netYield,
      breakEvenNights,
      roi10Years
    };
  }, [
    moodlPrice, landPrice, works, deposit, loanRate, loanDuration,
    nightlyRate, occupancyRate, dailyCharges, annualCharges, managementFees
  ]);

  const monthlyData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      cashflow: calculations.monthlyCashflow * (i + 1)
    }));
  }, [calculations]);

  const yearlyData = useMemo(() => {
    let cumulativeCashflow = 0;
    return Array.from({ length: 10 }, (_, i) => {
      cumulativeCashflow += calculations.annualCashflow;
      const year = i + 1;
      return {
        annee: `An ${year}`,
        cashflowCumule: cumulativeCashflow,
        revenusCumules: calculations.annualRevenue * year,
        capitalRembourse: Math.min(
          calculations.loanAmount,
          calculations.monthlyPayment * 12 * year
        )
      };
    });
  }, [calculations]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)} %`;
  };

  return (
    <div className="bg-background">
      <section className="pt-40 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-8 relative">
          <ScrollReveal animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary font-medium mb-6">
                Simulateur Moodl
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Calculez votre rentabilité en{' '}
                <span className="font-serif-italic text-secondary">30 secondes</span>.
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Onze paramètres ajustables, projections sur 12 mois et 10 ans.
                Estimation basée sur les performances réelles d'hébergements atypiques premium.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="fade-right">
              <div className="lg:col-span-1">
                <Card className="p-6 lg:p-8 bg-card border-border/60 sticky top-24">
                  <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Vos paramètres</h2>
                  <div className="space-y-6">
                    <SimulatorSlider label="Prix du Moodl" value={moodlPrice} onChange={setMoodlPrice} min={30000} max={150000} step={5000} suffix=" €" />
                    <SimulatorSlider label="Prix du terrain" value={landPrice} onChange={setLandPrice} min={0} max={200000} step={5000} suffix=" €" description="Optionnel si terrain déjà possédé" />
                    <SimulatorSlider label="Travaux & aménagement" value={works} onChange={setWorks} min={0} max={50000} step={1000} suffix=" €" />
                    <SimulatorSlider label="Apport personnel" value={deposit} onChange={setDeposit} min={0} max={200000} step={5000} suffix=" €" />
                    <SimulatorSlider label="Taux d'emprunt" value={loanRate} onChange={setLoanRate} min={1} max={8} step={0.1} suffix=" %" />
                    <SimulatorSlider label="Durée du prêt" value={loanDuration} onChange={setLoanDuration} min={5} max={25} step={1} suffix=" ans" />
                    <SimulatorSlider label="Loyer par nuit" value={nightlyRate} onChange={setNightlyRate} min={50} max={500} step={10} suffix=" €" />
                    <SimulatorSlider label="Taux d'occupation" value={occupancyRate} onChange={setOccupancyRate} min={30} max={100} step={5} suffix=" %" description={`${calculations.nightsPerYear} nuits par an`} />
                    <SimulatorSlider label="Charges par nuit" value={dailyCharges} onChange={setDailyCharges} min={0} max={100} step={5} suffix=" €" description="Ménage, conciergerie, fluides" />
                    <SimulatorSlider label="Charges annuelles" value={annualCharges} onChange={setAnnualCharges} min={0} max={10000} step={500} suffix=" €" description="Assurance, taxes, entretien" />
                    <SimulatorSlider label="Frais de gestion" value={managementFees} onChange={setManagementFees} min={0} max={30} step={5} suffix=" %" description="Commission plateforme" />
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal animation="fade-up">
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-6">Vos résultats</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResultCard icon={TrendingUp} label="Cashflow mensuel" value={formatCurrency(calculations.monthlyCashflow)} subtitle={calculations.monthlyCashflow > 0 ? "Gain positif" : "Besoin financement"} variant={calculations.monthlyCashflow > 0 ? "success" : "warning"} />
                    <ResultCard icon={Percent} label="Rentabilité brute" value={formatPercent(calculations.grossYield)} subtitle="Avant charges" variant="info" />
                    <ResultCard icon={BarChart3} label="Rentabilité nette" value={formatPercent(calculations.netYield)} subtitle="Après charges" variant="info" />
                    <ResultCard icon={DollarSign} label="Revenu annuel" value={formatCurrency(calculations.annualRevenue)} subtitle={`${calculations.nightsPerYear} nuits`} variant="success" />
                    <ResultCard icon={Home} label="Coût total projet" value={formatCurrency(calculations.totalCost)} subtitle={`Notaire: ${formatCurrency(calculations.notaryFees)}`} />
                    <ResultCard icon={Calendar} label="Mensualité crédit" value={formatCurrency(calculations.monthlyPayment)} subtitle={`Sur ${loanDuration} ans`} />
                    <ResultCard icon={Target} label="ROI à 10 ans" value={formatPercent(calculations.roi10Years)} subtitle={formatCurrency(calculations.annualCashflow * 10)} variant="success" />
                    <ResultCard icon={PiggyBank} label="Point d'équilibre" value={`${calculations.breakEvenNights} nuits`} subtitle="Pour couvrir charges" variant="info" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <Card className="p-6 lg:p-8 bg-card border-border/60">
                  <h3 className="font-display text-2xl font-bold tracking-tight mb-6">Projection 12 mois</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="month" stroke="hsl(var(--foreground-secondary))" style={{ fontSize: '12px' }} />
                      <YAxis stroke="hsl(var(--foreground-secondary))" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value)} />
                      <Area type="monotone" dataKey="cashflow" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCashflow)" name="Cashflow cumulé" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <Card className="p-6 lg:p-8 bg-card border-border/60">
                  <h3 className="font-display text-2xl font-bold tracking-tight mb-6">Projection 10 ans</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="annee" stroke="hsl(var(--foreground-secondary))" style={{ fontSize: '12px' }} />
                      <YAxis stroke="hsl(var(--foreground-secondary))" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value)} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
                      <Line type="monotone" dataKey="cashflowCumule" stroke="hsl(var(--primary))" strokeWidth={3} name="Cashflow cumulé" dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="revenusCumules" stroke="#10b981" strokeWidth={2} name="Revenus cumulés" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="capitalRembourse" stroke="#60a5fa" strokeWidth={2} name="Capital remboursé" strokeDasharray="3 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="zoom-in" delay={300}>
                <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-6">Votre projet en un coup d'œil</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div><p className="text-sm text-foreground-secondary mb-1">Budget total</p><p className="text-2xl font-bold">{formatCurrency(calculations.totalCost)}</p></div>
                    <div><p className="text-sm text-foreground-secondary mb-1">Revenus annuels</p><p className="text-2xl font-bold text-green-500">{formatCurrency(calculations.annualRevenue)}</p></div>
                    <div><p className="text-sm text-foreground-secondary mb-1">Rentabilité nette</p><p className="text-2xl font-bold text-primary">{formatPercent(calculations.netYield)}</p></div>
                    <div><p className="text-sm text-foreground-secondary mb-1">Cashflow mensuel</p><p className="text-2xl font-bold text-primary">{formatCurrency(calculations.monthlyCashflow)}</p></div>
                  </div>
                  <p className="text-sm text-foreground-secondary italic mb-6">
                    Estimation basée sur les performances d'hébergements atypiques premium.
                  </p>
                  <NavLink to="/contact"><Button variant="moodl" size="lg" className="w-full">Planifier un appel expert</Button></NavLink>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <section className="relative py-32 overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">Votre projet peut commencer <span className="font-serif-italic text-secondary">aujourd'hui</span>.</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to="/modules"><Button variant="moodl" size="lg" className="text-lg px-8">Choisir mon module</Button></NavLink>
                <NavLink to="/contact"><Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">Parler à un expert</Button></NavLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Simulateur;
