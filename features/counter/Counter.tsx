import { FC } from 'react'
import { addAmount, decrement, fetchTime, increment, selectCounterValue } from './counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from '../loading/loadingSlice'
import { AppDispatch } from '../../store'
import { IconButton } from '@material-ui/core'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { FaRegHeart } from 'react-icons/fa'
import RippleButton from '../../components/Button/RippleButton'

const Counter: FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const counterValue = useSelector(selectCounterValue)
  const loading = useSelector(selectIsLoading)

  function dispatchIncrement() {
    dispatch(increment())
  }
  function dispatchDecrement() {
    dispatch(decrement())
  }

  const dispatchAddAmount = () => {
    dispatch(addAmount(10))
  }

  const dispatchFetchTime = async () => {
    await dispatch(fetchTime(10))
  }

  return (
    <>
      <RippleButton>
        <AiOutlineCheckCircle />
      </RippleButton>
      <IconButton color="primary" disableRipple={true}>
        <AiOutlineCheckCircle />
      </IconButton>
      <IconButton color="primary">
        <FaRegHeart />
      </IconButton>
      <IconButton color="primary">
        <AccessTimeIcon />
      </IconButton>
      <div className="row">
        <button className="button" aria-label="Increment value" onClick={dispatchIncrement}>
          +
        </button>
        <span className="value">{counterValue}</span>
        <button className="button" aria-label="Decrement value" onClick={dispatchDecrement}>
          -
        </button>
        <button className="button" aria-label="Increment value" onClick={dispatchAddAmount}>
          ++
        </button>
        <button className="button" aria-label="Increment value" onClick={dispatchFetchTime}>
          {'>>'}
        </button>
      </div>
      {loading && <p>Loading</p>}
    </>
  )
}

export default Counter
