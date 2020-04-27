import { observable, action } from "mobx";

class SiderStore {
    @observable
    isSiderCollapsed = true;

    @action
    public toggleSider = (): void => {
        this.isSiderCollapsed = !this.isSiderCollapsed;        
    };
}

export default SiderStore;