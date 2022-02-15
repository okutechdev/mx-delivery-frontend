import type { NextPage } from 'next'
import styles from './styles.module.scss'

type SmallCardType = {
  title: string,
  subtitle: string,
  color?: string
}

const SmallCard: NextPage<SmallCardType> = ({title, subtitle, color='#18A0FB'}: SmallCardType) => {
  return (
     <div className={styles.card} style={{ backgroundColor: color }}>
       <h3>{title}</h3>
       <span>{subtitle}</span>
     </div>
  )
}

export default SmallCard
