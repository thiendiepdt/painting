import { FC, HTMLAttributes, useEffect } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const rippleStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.4s ease-out;
  background-color: rgba(63, 81, 181, 0.7);

  @keyframes ripple {
    to {
      opacity: 0.04;
      transform: scale(1);
    }
  }
`

interface RippleBaseProps extends HTMLAttributes<HTMLButtonElement> {
  timer: NodeJS.Timeout
}

const RippleBase: FC<RippleBaseProps> = ({ timer, className }) => {
  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <div className={className} />
}

const Ripple = styled(RippleBase)`
  ${rippleStyles}
`

export default Ripple
