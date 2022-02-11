export interface IPopup {
    title: string;
    show:  boolean;
    onClose: (flag: boolean) => void;
    children: React.ReactNode;
};