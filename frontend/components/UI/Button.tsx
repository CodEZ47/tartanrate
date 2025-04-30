interface ButtonProps {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
    type?: "button" | "submit";
    className?: string;
  }
  
  export default function Button({
    text,
    onClick,
    icon,
    type = "button",
    className = "",
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition ${className}`}
      >
        {icon && <span>{icon}</span>}
        <span>{text}</span>
      </button>
    );
  }
  