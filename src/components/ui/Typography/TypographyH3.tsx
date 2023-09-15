import { cn } from "../../../lib/utils";

export default function TypographyH3({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
            {children}
        </h3>
    )
}
