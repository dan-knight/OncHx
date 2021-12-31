export interface Options extends Option { 
  options: { [key: string]: Option } 
};

export type Option = { label: string | undefined  };