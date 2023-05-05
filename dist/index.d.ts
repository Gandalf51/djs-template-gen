declare enum BaseTypes {
    Slash = 1,
    Prefix = 2
}
interface BaseOptions {
    type: BaseTypes;
    templateName?: string;
}
declare class TemplateGenerator {
    private sourceDir;
    private readonly destinationDir;
    constructor(options?: BaseOptions);
    private getSourceTemplate;
    private copyFileSync;
    private copyFolderRecursiveSync;
    private copyTemplate;
    createBase(options: BaseOptions): void;
}
export { TemplateGenerator, BaseTypes };
