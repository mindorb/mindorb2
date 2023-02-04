class UndoManager {
    constructor(updateUI) {
        this.states = [];
        this.updateUI = updateUI;
    }

    pushState(state) {
        this.states.push(state);
        console.log("PUSHED");
        console.log(this.states.length);
    }

    undo() {
        console.log("UNDO CALLED");
        console.log(this.states.length);
        if (this.states.length < 1) return;
        console.log("UPDATEUI CALLED");
        this.updateUI(this.states[this.states.length - 1]);
        this.states.pop();
    }

    addItem(id, addedIDs) {
        this.pushState({ type: "add", id, addedIDs });
    }

    changeItemText(id, text) {
        this.pushState({ type: "changeText", id, text });
    }

    resizeItem(id, originalRadius, childAndParentRadiuses) {
        this.pushState({ type: "resize", id, originalRadius, childAndParentRadiuses });
    }

    deleteItem(id, objects) {
        this.pushState({ type: "delete", id, objects });
    }

    replaceUUID(oldID, newID) {
        let index;
        console.log("REPO "+oldID+" newID"+newID);
        index = this.states.findIndex(function (state) {
          return (
            (state.type=='add') && (state.addedIDs.includes(oldID))
          );
        });
        console.log("Index: "+index);
        if (index !== -1) {
          this.states[index].addedIDs = this.states[index].addedIDs.map(function(addedID) {
            return addedID == oldID ? newID : addedID;
          });
          console.log(this.states[index].addedIDs);
        }

      

      }
}