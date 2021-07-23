import createPersistedState from "use-persisted-state"
const useAppState = createPersistedState("app")

const useGlobalState = initialState => {
  const [appState, setAppState] = useAppState(initialState)

  return {
    appState,
    setGlobalState: (key, value) =>
      setAppState(prevState => ({
        ...prevState,
        [key]: value,
      })),
  }
}

export default useGlobalState
