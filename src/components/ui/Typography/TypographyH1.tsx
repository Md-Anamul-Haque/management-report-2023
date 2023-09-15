import { cn } from "../../../lib/utils";

export default function TypographyH1({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1 {...props} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {children}
        </h1>
    )
}
