import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { ButtonHTMLAttributes } from "react"

export const buttonVariants = cva(
    'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'text-white bg-slate-900 hover:bg-slate-800',
                ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2',
                lg: 'h-11 px-8',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    },
)

// Esta interfaz es necesaria para que el componente Button pueda recibir las propiedades de los botones
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean
}

export default function Button({className, children, variant, isLoading, size, ...props}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({variant, size, className}))} disabled={isLoading} {...props}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {/* Children es lo que ponemos dentro del componente Button, ejemplo el nombre */}
        {children}
    </button>
  )
}

export function ButtonSend({className, children, variant, isLoading, size, ...props}: ButtonProps) {
        return (
            <button className={cn(buttonVariants({variant, size, className}))} disabled={isLoading} {...props}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
            </button>
        )
    }
