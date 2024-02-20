import React from 'react'
interface Props {
  label: string,
  secondary?: boolean,
  fullWidth?: boolean,
  large?: boolean,
  disabled?: boolean,
  outline?: boolean,
  onClick: () => void,
}

const Button: React.FC<Props> = ({label, secondary, fullWidth, large, disabled, outline, onClick}) => {
  return (
    <button type='button' disabled={disabled} onClick={onClick} className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2
    ${fullWidth ? 'w-full' : ''}
    ${secondary ? 'bg-white' : 'bg-sky-500'} ${secondary ? 'text-black' : 'text-white'} ${secondary ? 'border-black' : 'border-sky-500'}
    ${large ? 'text-xl': 'text-md'} ${large ? 'px-5': 'px-4'} ${large ? 'py-3': 'py-2'}
    ${outline ? 'bg-transparent': ''} ${outline ? 'border-white': ''} ${outline ? 'text-white': ''}
    `}>
      {label}
    </button>
  )
}

export default Button