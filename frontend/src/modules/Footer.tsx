export function Footer() {
  return (
    <footer className="border-primary/50 bg-primary/2 border-t py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 text-xl font-bold">
              <span className="from-primary via-accent bg-gradient-to-r to-pink-400 bg-clip-text text-transparent">
                KlikKlak
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium PC components for builders who demand the best.
            </p>
          </div>
          <div>
            <h3 className="text-primary mb-4 font-medium">Products</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Processors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Graphics Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Memory
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Storage
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary mb-4 font-medium">Support</h3>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-primary/50 text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; 2024 KlikKlak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
