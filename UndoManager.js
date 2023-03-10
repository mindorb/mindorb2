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
        console.log(this.states.length);
        if (this.states.length < 1) return;
        this.updateUI(this.states[this.states.length - 1]);
        this.states.pop();
    }

    addItem(id, itemType, addedIDs) {
        this.pushState({ type: "add", id, itemType, addedIDs });
    }

    changeItemText(id, text) {
        this.pushState({ type: "changeText", id, text });
    }

    resizeItem(id, originalRadius, childAndParentRadiuses) {
        this.pushState({ type: "resize", id, originalRadius, childAndParentRadiuses });
    }

    deleteItem(id, objects, parentItem, replaceItem) {
        this.pushState({ type: "delete", id, objects, parentItem, replaceItem});
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