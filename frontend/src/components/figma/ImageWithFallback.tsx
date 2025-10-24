import * as React from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    fallbackSrc?: string
}

export function ImageWithFallback({
    src,
    alt,
    className,
    fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3EImage%3C/text%3E%3C/svg%3E",
    ...props
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = React.useState(src)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setImgSrc(src)
        setIsLoading(true)
    }, [src])

    return (
        <img
            {...props}
            src={imgSrc}
            alt={alt}
            className={cn(className, isLoading && "opacity-0 transition-opacity duration-300")}
            onLoad={() => setIsLoading(false)}
            onError={() => {
                setImgSrc(fallbackSrc)
                setIsLoading(false)
            }}
        />
    )
}
