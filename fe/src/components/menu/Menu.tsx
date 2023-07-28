type Props = {
  closeMenu: () => void
}

export const Menu = ({ closeMenu }: Props) => {
  return <div onClick={closeMenu}>text</div>
}
