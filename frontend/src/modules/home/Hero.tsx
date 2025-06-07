import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import { Logo } from "@/assets/svgs"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-800/20 to-neutral-700/20"></div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center space-x-2">
              <Zap className="text-primary h-6 w-6 animate-pulse" />
              <span className="text-primary font-medium">Premium Components</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              Build
              <span className="from-primary via-accent block bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
                Better
              </span>
            </h1>
            <p className="text-muted-foreground mb-8 max-w-lg text-xl">
              Premium PC components for enthusiasts who demand excellence. Powered by
              cutting-edge technology.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-primary/20 hover:border-primary/50"
              >
                Explore Builds
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Logo className="w-84" />
          </div>
        </div>
      </div>
    </section>
  )
}
