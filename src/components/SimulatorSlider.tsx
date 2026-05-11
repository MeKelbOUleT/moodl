import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";

interface SimulatorSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

const SimulatorSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
  description
}: SimulatorSliderProps) => {
  const formatValue = (val: number) => {
    return `${prefix}${val.toLocaleString('fr-FR')}${suffix}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value.replace(/[^\d.-]/g, ''));
    if (!isNaN(val)) {
      onChange(Math.min(Math.max(val, min), max));
    }
  };

  return (
    <div className="space-y-3 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="text-base font-semibold">{label}</Label>
          {description && (
            <p className="text-xs text-foreground-secondary mt-1">{description}</p>
          )}
        </div>
        <Input
          type="text"
          value={formatValue(value)}
          onChange={handleInputChange}
          className="w-32 text-right font-semibold bg-background-secondary border-border/50 focus:border-primary transition-all"
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-foreground-secondary">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default SimulatorSlider;
