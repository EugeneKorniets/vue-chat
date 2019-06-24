export default function ({ store, redirect }) {
  if (!Object.keys(store.state.currentUser).length) {
    redirect('/?message=noUser')
  }
}
