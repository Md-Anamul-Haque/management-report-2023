import { cn } from "../../../lib/utils";

export default function TypographyP({
    children, className, ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6", className || '')}>
            {children}
        </p>
    )
}
