import { observable, action } from "mobx";

class ModalStore {
    @observable isModalVisible = false;

    @action
    public toggleModal = (): void => {
        this.isModalVisible = !this.isModalVisible;        
    };
}

export default ModalStore;