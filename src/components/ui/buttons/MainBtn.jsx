import Link from 'next/link'
import TextFlipper from '@/components/ui/text/TextFlipper.jsx'
import ClickEffect from '@/components/ui/effects/ClickEffect.jsx'

const MainBtn = ({
  children,
  text = 'MainBtn',
  icon: IconComponent,
  iconPosition = 'right',
  withIcon = true,

  to,
  href,
  onClick,

  look = 'main', // 'main', 'sec', 'outline', 'ghost', `line`
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  fullWidth = false,

  disabled = false,
  loading = false,

  ...rest
}) => {
  const getlookStyles = () => {
    const baseStyles = 'flex gap-2 justify-center items-center font-light text-center uppercase border duration-300 outline-none'

    switch (look) {
      case 'main':
        return `${baseStyles} text-text bg-main border-main/25 hover:bg-main/75 hover:border-transparent`
      case 'sec':
        return `${baseStyles} text-main bg-transparent border-main/25 hover:bg-main hover:text-text`
      case 'outline':
        return `${baseStyles} text-main border-main hover:bg-main hover:text-text`
      case 'ghost':
        return `${baseStyles} text-main border-transparent hover:bg-main/10`
      case 'line':
        return `${baseStyles} text-main border-transparent !p-0`
      default:
        return `${baseStyles} text-main border-main/25 hover:bg-main hover:text-text`
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm'
      case 'lg':
        return 'px-8 py-4 text-lg'
      case 'md':
      default:
        return 'px-6 py-3 text-base'
    }
  }

  const renderIcon = () => {
    if (!withIcon || !IconComponent) return null

    const iconElement = <IconComponent className={size === 'sm' ? 'size-4!' : 'size-5!'} />

    return <span className={`flex justify-center items-center mt-1 mb-2 mx-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>{iconElement}</span>
  }

  const renderLoader = () => {
    if (!loading) return null

    return (
      <span className="flex absolute inset-0 justify-center items-center bg-main/5">
        <div className="rounded-full border-2 border-current animate-spin size-4 border-t-transparent" />
      </span>
    )
  }

  const buttonStyles = `
    cursor-pointer
    ${getlookStyles()}
    ${getSizeStyles()}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${loading ? 'opacity-70 cursor-wait' : ''}
    ${className}
  `.trim()

  const buttonContent = (
    <div className="size-full flex justify-center items-center">
      <TextFlipper tag="span">{children || text}</TextFlipper>
      <TextFlipper tag="span" className={`ltr:rotate-0 rtl:rotate-180`}>
        {withIcon && iconPosition === 'right' && renderIcon()}
      </TextFlipper>
    </div>
  )

  const buttonContentWithLeftIcon = (
    <div className="size-full flex justify-center items-center">
      <TextFlipper tag="span" className={`ltr:rotate-0 rtl:rotate-180`}>
        {withIcon && iconPosition === 'left' && renderIcon()}
      </TextFlipper>
      <TextFlipper tag="span">{children || text}</TextFlipper>
    </div>
  )

  const content = iconPosition === 'left' ? buttonContentWithLeftIcon : buttonContent

  const renderButton = () => {
    const commonProps = {
      className: buttonStyles,
      disabled: disabled || loading,
      ...rest,
    }

    if (to) {
      return (
        <Link href={to} {...commonProps}>
          {content}
          {renderLoader()}
        </Link>
      )
    }

    if (href) {
      return (
        <a href={href} {...commonProps}>
          {content}
          {renderLoader()}
        </a>
      )
    }

    return (
      <button look="button" onClick={onClick} {...commonProps}>
        {content}
        {renderLoader()}
      </button>
    )
  }

  return <ClickEffect>{renderButton()}</ClickEffect>
}

export default MainBtn
