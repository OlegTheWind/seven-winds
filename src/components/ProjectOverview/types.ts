export interface TreeRow {
    id: number;
    rowName: string;
    child?: TreeRow[];
    salary?: number;
    equipmentCosts?: number;
    overheads?: number;
    estimatedProfit?: number;
    parentId?: number | null;
    machineOperatorSalary?: number;
    mainCosts?: number;
    materials?: number;
    mimExploitation?: number;
    supportCosts?: number;
}
export interface FetchIdResult {
    id: number;
    rowName: string;
    error?: string;
}

export interface FetchIdHookResult {
    entity: FetchIdResult | null;
    loading: boolean;
    error: string | null;
    fetchId: () => Promise<void>;
}

export interface TreeRowsHookResult {
    list: TreeRow[];
    error: string | null;
    fetchData: (id: number) => Promise<void>;
}

export interface CreateEntityParams {
    id: number;
    requestData: {
        equipmentCosts: number;
        estimatedProfit: number;
        machineOperatorSalary: number;
        mainCosts: number;
        materials: number;
        mimExploitation: number;
        overheads: number;
        parentId: number | null;
        rowName: string;
        salary: number;
        supportCosts: number;
    };
}

export interface UseCreateEntityResult {
    createEntity: () => Promise<void>;
    loading: boolean;
    error: string | null;
    responseData: any;
}
export interface CreateEntityResponse {
    id: number;
    rowName: string;
    total: number;
    salary: number;
    mimExploitation: number;
    machineOperatorSalary: number;
    materials: number;
    mainCosts: number;
    supportCosts: number;
    equipmentCosts: number;
    overheads: number;
    estimatedProfit: number;
    parentId: number | null;
}

export interface UpdateRowParams {
    eId: number;
    rId: number;
}

export interface UseUpdateRowResult {
    updateRow: (requestData: any) => Promise<any>;
    loading: boolean;
    error: string | null;
    responseData: any;
}
