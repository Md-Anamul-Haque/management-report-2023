import { cn } from "../../../lib/utils";

export default function TypographyH5({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h5 {...props} className={cn("scroll-m-20 text-lg font-medium tracking-tight", className)}>
            {children}
        </h5>
    )
}
