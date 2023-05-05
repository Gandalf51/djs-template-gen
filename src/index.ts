import * as fs from 'node:fs';
import * as path from 'node:path';

enum BaseTypes {
  Slash = 1,
  Prefix = 2
}

interface BaseOptions {
  type: BaseTypes;
  templateName?: string; // nome do template
}

interface Colors {
  SUCCESS: string;
  ERROR: string;
}

const COLORS: Colors = {
  SUCCESS: '\x1b[32m',
  ERROR: '\x1b[31m'
}

interface TemplatePaths {
  [templateName: string]: string; // nome do template associado ao caminho
}

const TEMPLATES: TemplatePaths = {
  slash: path.join(__dirname, '..', 'src', 'templates', 'slash'),
  prefix: path.join(__dirname, '..', 'src', 'templates', 'prefix')
}

class TemplateGenerator {
  private sourceDir: string;
  private readonly destinationDir: string;

  constructor(options?: BaseOptions) {
    const templateName = options?.templateName || 'slash'; // define o diretório padrão como o template de barra
    this.sourceDir = TEMPLATES[templateName];
    this.destinationDir = process.cwd();

  }

  private getSourceTemplate(type: BaseTypes): string {
    const templateName = type === BaseTypes.Prefix ? 'prefix' : 'slash';
    return TEMPLATES[templateName];
  }

  private copyFileSync(src: string, dest: string) {
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
  }

  private copyFolderRecursiveSync(source: string, destination: string) {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const srcPath = path.join(source, file);
      const destPath = path.join(destination, file);
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyFolderRecursiveSync(srcPath, destPath);
      } else {
        this.copyFileSync(srcPath, destPath);
      }
    });
  }

  private copyTemplate(type: BaseTypes): void {
    const sourceTemplate: string = this.getSourceTemplate(type);
    this.copyFolderRecursiveSync(sourceTemplate, this.destinationDir);
    console.log(`${COLORS.SUCCESS}✔ Source gerada com sucesso!`);
  }

  createBase(options: BaseOptions): void {
    if (options.templateName && !TEMPLATES[options.templateName]) {
      throw new Error(`Template '${options.templateName}' não encontrado.`);
    }
    this.sourceDir = options.templateName ? TEMPLATES[options.templateName] : this.sourceDir;
    this.copyTemplate(options.type);
  }
}

export { TemplateGenerator, BaseTypes };
