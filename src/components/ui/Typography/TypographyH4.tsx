import { cn } from "../../../lib/utils";

export default function TypographyH4({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h4 {...props} className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
            {children}
        </h4>
    )
}
