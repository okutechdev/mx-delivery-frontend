import type  { NextPage } from 'next'
import styles from './styles.module.scss'

type PageHeaderType = {
    title: string
    buttonTitle?: string,
    handle?: ()=> void
}


const PageHeader : NextPage<PageHeaderType> = ({title, buttonTitle, handle})=>{
    return (
        <div className={styles.header}>
            <h2>{title}</h2>
            {buttonTitle && <button onClick={handle}>{buttonTitle}</button>}
        </div>
    )
}

export default PageHeader;