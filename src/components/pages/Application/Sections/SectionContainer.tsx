import styles from './SectionContainer.module.css'
export default function SectionContainer({children}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
