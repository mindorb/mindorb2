class UndoManager {
    constructor(updateUI) {
        this.states = [];
        this.updateUI = updateUI;
    }

    pushState(state) {
        this.states.push(state);
    }

    undo() {
        console.log("UNDO CALLED");
        if (this.states.length <= 1) return;
        this.updateUI(this.states[this.states.length - 1]);
        this.states.pop();
    }

    addItem(id, text, itemType) {
        this.pushState({ type: "add", id, text, itemType });
    }

    changeItemText(id, text) {
        this.pushState({ type: "changeText", id, text });
    }

    resizeItem(id, size) {
        this.pushState({ type: "resize", id, size });
    }

    deleteItem(id, object) {
        this.pushState({ type: "delete", id, object });
    }
}