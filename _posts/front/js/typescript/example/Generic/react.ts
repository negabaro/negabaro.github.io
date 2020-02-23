class Component<Props, State> {
  props: Props;
  state: State;
}

class A extends Component {} //Generic type 'Component<Props, State>' requires 2 type argument(s).

class B extends Component<{ keke: string }, { hoho: number }> {
  run() {
    this.props.keke;
    this.state.hoho;
  }
}
