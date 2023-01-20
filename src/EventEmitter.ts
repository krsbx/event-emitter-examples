class EventEmitter {
  private eventContainer: Map<string, Function[]>;
  protected debugMode: boolean;

  public constructor({ debugMode }: { debugMode?: boolean } = {}) {
    this.debugMode = debugMode === true;
    this.eventContainer = new Map<string, Function[]>();
  }

  public on(eventName: string, callback: Function) {
    if (this.eventContainer.has(eventName)) {
      const callbacks = this.eventContainer.get(eventName)!;
      callbacks.push(callback);

      return this;
    }

    this.eventContainer.set(eventName, [callback]);

    return this;
  }

  public emit(eventName: string, data: unknown) {
    const callbacks = this.eventContainer.get(eventName);

    if (!callbacks || !callbacks.length) {
      if (this.debugMode)
        console.warn(
          `Error : Event with name '${eventName}' is not registered`
        );

      return this;
    }

    callbacks.forEach((callback) => {
      callback(data);
    });

    return this;
  }

  public removeListener(eventName: string, callback: Function) {
    const callbacks = this.eventContainer.get(eventName);

    if (!callbacks || !callbacks.length) {
      if (this.debugMode)
        console.warn(
          `Error : Event with name '${eventName}' is not registered`
        );

      return;
    }

    const index = callbacks.findIndex((cb) => cb === callback);

    if (index === -1) return;

    callbacks.splice(index, 1);
  }

  public removeAllListener() {
    this.eventContainer.clear();
  }
}

export default EventEmitter;
