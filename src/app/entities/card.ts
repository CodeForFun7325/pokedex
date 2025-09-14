export default interface CardData {
    name: string;
    imageSource: string;
    onClick: (url: string) => void;
}