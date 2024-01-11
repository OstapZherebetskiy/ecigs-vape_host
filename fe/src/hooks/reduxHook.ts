import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AppDispatch, RootState, allActions } from '@/store/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(allActions, dispatch)
}
