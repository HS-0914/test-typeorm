import { readFileSync } from "fs";
import * as yaml from 'js-yaml';  // 따로 devDependencies에 추가됨 
import {join} from "path";

const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';

export default() => {
    return yaml.load(
        (process.env.NODE_ENV==='production')?
            readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf8')
        :   readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf8')  
    )as Record<string, any>; // yaml 파일에 있는 string 값을 읽고 결과값을 가져오는
}

// dist폴더에 yaml 파일이 복사된후 start 를 하면서  dist 폴더가 삭제후 다시 생성됩니다 그럼 yaml  파일도 삭제가 됩니다
// copy-file가 되고 삭제됨 => nest-cli의 "deleteOutDir": true를 false로