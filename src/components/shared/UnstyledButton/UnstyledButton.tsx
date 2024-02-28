import styles from './UnstyledButton.module.css';

export default function UnstyledButton(props : any) {
  const newProps = {...props , className:styles.unstyled_btn+' '+props.className}
  return (
    <button {...newProps}  >
      {props.children}
    </button>
  )
}
