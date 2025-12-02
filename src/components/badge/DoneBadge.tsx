import Icon from "@/components/icon";
import { useCanvas } from "@/hooks/use-canvas";

type BadgeSize = "large" | "small";

interface Props {
  current: number;
  total: number;
  size: BadgeSize;
}

const typography: Record<BadgeSize, string> = {
  large: "text-lg-m",
  small: "text-md-r",
};

export default function DoneBadge({ current, total, size }: Props) {
  const fontColor = current > 0 ? "text-brand-primary" : "text-state-400";
  const safeCurrent = Math.max(0, current);
  const safeTotal = Math.max(0, total);
  const isDone = safeTotal > 0 && safeCurrent === safeTotal;

  return (
    <div className={`${typography[size]} rounded-full px-2 py-1`}>
      <div className="flex items-center gap-1">
        {isDone ? (
          <Icon name="progressDone" size={size} />
        ) : (
          <CircularProgress
            value={safeTotal === 0 ? 0 : safeCurrent / safeTotal}
            size={size}
          />
        )}
        <span className={`${fontColor}`}>{`${safeCurrent}/${safeTotal}`}</span>
      </div>
    </div>
  );
}

function CircularProgress({ value, size }: { value: number; size: BadgeSize }) {
  const containerSize = size === "large" ? 20 : 16;
  const drawPadding = size === "large" ? 3 : 2;
  const canvasSize = containerSize - drawPadding * 2;

  const canvasRef = useCanvas({
    size: canvasSize,
    draw: (context: CanvasRenderingContext2D) => {
      const lineWidth = size === "large" ? 2.5 : 2;
      const center = canvasSize / 2;
      const radius = center - lineWidth;
      const startAngle = 0;
      const progressEndAngle = startAngle + value * 2 * Math.PI;

      context.clearRect(0, 0, canvasSize, canvasSize);

      context.beginPath();
      context.arc(center, center, radius, startAngle, 2 * Math.PI);
      context.strokeStyle = "#E2E8F0"; // state-200
      context.lineWidth = lineWidth;
      context.stroke();

      if (value === 0) return;

      context.beginPath();
      context.arc(center, center, radius, startAngle, progressEndAngle);
      context.strokeStyle = "#74A1FB"; // icon/brand
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.stroke();
    },
  });

  return (
    <div className={`size-[${containerSize}px] p-[${drawPadding}px]`}>
      <canvas width={canvasSize} height={canvasSize} ref={canvasRef}></canvas>
    </div>
  );
}
