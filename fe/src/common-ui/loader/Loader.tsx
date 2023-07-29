import style from './Loader.module.scss'

type Props = {
  size?: 'small' | 'normal' | 'big' | 'mega'
}

export const Loader = ({ size = 'small' }: Props) => {
  return (
    <div className={style[size]}>
      <div className={style['loadingio-spinner-wedges-27lxq0w2q9x']}>
        <div className={style['ldio-02d14r67mqrt']}>
          <div>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  )
}
