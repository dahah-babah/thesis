import { observable, action } from "mobx";

class SiderStore {
    @observable
    isSiderCollapsed = false;

    @action
    public toggleSider = (): void => {
        this.isSiderCollapsed = !this.isSiderCollapsed;        
    };
}

export default SiderStore;