import { forwardRef, HTMLAttributes, ReactNodeArray, useRef, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Ripple from './Ripple'

const styles = css`
  position: relative;
  padding: 12px;
  border: none;
  background: transparent;
  outline: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(63, 81, 181, 0.04);
  }

  & span {
    font-size: 24px;
    display: block;
    width: 24px;
    height: 24px;
  }
`

export interface RippleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disableRipple?: boolean
}

const ButtonBase = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, disableRipple, ...props }, ref) => {
    const nextKey = useRef(0)

    const [ripples, setRipples] = useState<ReactNodeArray>([])

    const onClick = () => {
      const timer = setTimeout(() => {
        setRipples((prevRipples) => {
          return prevRipples.slice(1)
        })
      }, 400)
      setRipples((prevRipples) => {
        nextKey.current++
        return [...prevRipples, <Ripple key={nextKey.current} timer={timer} />]
      })
    }

    return (
      <button ref={ref} className={`${disableRipple ? 'ripple' : ''}`} onClick={onClick} {...props}>
        {ripples}
        <span>{children}</span>
      </button>
    )
  }
)

const RippleButton = styled(ButtonBase)`
  ${styles}
`

export default RippleButton
