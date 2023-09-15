import { cn } from "../../../lib/utils";

export default function TypographyH2({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h2 {...props} className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0", className || '')}>
            {children}
        </h2>
    )
}