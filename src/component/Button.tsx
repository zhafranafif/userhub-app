
interface ButtonProps {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    isPrimary?: boolean;
}

export function Button({ label, onClick, icon, isPrimary }: ButtonProps) {
    return (
        <button
        onClick={onClick}
        className={`flex px-4 py-2 text-sm font-semibold rounded-xl gap-2 items-center hover:cursor-pointer ${isPrimary ? "bg-primary text-secondary" : "bg-background text-primary border border-primary"}`}
        >
            {label}
            {icon && <span className="mr-2">{icon}</span>}
        </button>
    )
}