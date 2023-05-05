"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTypes = exports.TemplateGenerator = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
var BaseTypes;
(function (BaseTypes) {
    BaseTypes[BaseTypes["Slash"] = 1] = "Slash";
    BaseTypes[BaseTypes["Prefix"] = 2] = "Prefix";
})(BaseTypes || (BaseTypes = {}));
exports.BaseTypes = BaseTypes;
const COLORS = {
    SUCCESS: '\x1b[32m',
    ERROR: '\x1b[31m'
};
const TEMPLATES = {
    slash: path.join(__dirname, '..', 'src', 'templates', 'slash'),
    prefix: path.join(__dirname, '..', 'src', 'templates', 'prefix')
};
class TemplateGenerator {
    constructor(options) {
        const templateName = (options === null || options === void 0 ? void 0 : options.templateName) || 'slash'; // define o diretório padrão como o template de barra
        this.sourceDir = TEMPLATES[templateName];
        this.destinationDir = process.cwd();
    }
    getSourceTemplate(type) {
        const templateName = type === BaseTypes.Prefix ? 'prefix' : 'slash';
        return TEMPLATES[templateName];
    }
    copyFileSync(src, dest) {
        const data = fs.readFileSync(src);
        fs.writeFileSync(dest, data);
    }
    copyFolderRecursiveSync(source, destination) {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination);
        }
        const files = fs.readdirSync(source);
        files.forEach((file) => {
            const srcPath = path.join(source, file);
            const destPath = path.join(destination, file);
            if (fs.statSync(srcPath).isDirectory()) {
                this.copyFolderRecursiveSync(srcPath, destPath);
            }
            else {
                this.copyFileSync(srcPath, destPath);
            }
        });
    }
    copyTemplate(type) {
        const sourceTemplate = this.getSourceTemplate(type);
        this.copyFolderRecursiveSync(sourceTemplate, this.destinationDir);
        console.log(`${COLORS.SUCCESS}✔ Source gerada com sucesso!`);
    }
    createBase(options) {
        if (options.templateName && !TEMPLATES[options.templateName]) {
            throw new Error(`Template '${options.templateName}' não encontrado.`);
        }
        this.sourceDir = options.templateName ? TEMPLATES[options.templateName] : this.sourceDir;
        this.copyTemplate(options.type);
    }
}
exports.TemplateGenerator = TemplateGenerator;
