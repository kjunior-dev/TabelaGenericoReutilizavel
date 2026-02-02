
---

# README - TableGeneric com TanStack Table e Colunas Customizadas

## 1. Objetivo

O código implementa uma **tabela genérica** (`TableGeneric`) em **React** usando a biblioteca [@tanstack/react-table](https://tanstack.com/table/v8/docs/overview), com suporte para colunas customizadas e badges de status.
Ela é usada no exemplo com uma tabela de **pagamentos** (`sectionPagamentoColumns`), exibindo informações como estado, valor, datas e ações.

---

## 2. Estrutura do Projeto

O projeto utiliza:

* **React 18 / Next.js** (modo client)
* **TypeScript** para tipagem de dados
* **Tailwind CSS** para estilização
* **TanStack Table** para lógica de tabelas
* **Componentes atômicos** (`Card`, `Badge`, `Tooltip`) para UI
* **Lucide Icons** para ícones (`Eye`, `CreditCard`)

---

## 3. Tabela Genérica (`TableGeneric.tsx`)

### 3.1 Props

```ts
type TableProps<T> = {
    columns: ColumnDef<T>[]; // Colunas da tabela
    data: T[];               // Dados a serem exibidos
    title?: string           // Título opcional da tabela
};
```

* `columns`: Array de definições de coluna (TanStack Table).
* `data`: Array de objetos genéricos do tipo `T`.
* `title`: Título opcional que aparece no `CardHeader`.

### 3.2 Hook da tabela

```ts
const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
});
```

* Cria o **estado da tabela**.
* `getCoreRowModel` é usado para gerar as linhas visíveis.

### 3.3 Estrutura JSX

```tsx
<Card>
    <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
        <table className="w-full border-collapse">
            <thead> ... </thead>
            <tbody> ... </tbody>
        </table>
    </CardContent>
</Card>
```

* A tabela é **embrulhada em um Card**, seguindo a UI da aplicação.
* **Cabeçalho (`thead`)**: itera sobre `table.getHeaderGroups()` e renderiza cada `header`.
* **Corpo (`tbody`)**: itera sobre `table.getRowModel().rows` e renderiza cada célula.

### 3.4 Renderização de células

```ts
{flexRender(cell.column.columnDef.cell, cell.getContext())}
```

* `flexRender` permite renderizar **componentes React ou valores simples** dentro das células.
* Cada célula recebe o **contexto da linha**, incluindo `row.original`.

---

## 4. Colunas Customizadas (`sectionPagamentoColumns.ts`)

Define a estrutura de colunas para o tipo `Pagamento`:

```ts
export const sectionPagamentoColumns: ColumnDef<Pagamento>[] = [ ... ];
```

### 4.1 Colunas com badges

```tsx
{
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
        <Badge className={row.original.estado === "Concluído" ? "bg-green-300 text-green-700" : "bg-red-300 text-red-700"}>
            {row.original.estado}
        </Badge>
    )
}
```

* Mostra **estado do pagamento** em verde se concluído, vermelho caso contrário.
* Usa `Badge` customizado para melhor visibilidade.

### 4.2 Colunas simples

```tsx
{
    accessorKey: "alvara",
    header: "Alvara",
    cell: ({ row }) => <p>{row.original.alvara}</p>
}
```

* Colunas como `alvara`, `processo`, `valor`, `tipo`, `data_registro`, etc., exibem apenas texto simples.

### 4.3 Coluna de ações

```tsx
{
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
        return row.original.estado === "Concluído" ? (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Eye className="w-4 h-4"/>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ver Detalhe de Pagamento</p>
                </TooltipContent>
            </Tooltip>
        ) : (
            <div className="flex gap-2">
                <Tooltip> ...Eye... </Tooltip>
                <Tooltip> ...CreditCard... </Tooltip>
            </div>
        );
    }
}
```

* Se **Concluído**, mostra apenas o ícone de **ver detalhe**.
* Se não concluído, mostra **ver detalhe** + **pagar agora**.
* Usa `Tooltip` para exibir descrições quando o usuário passa o mouse.

---

## 5. Como usar

```tsx
import { TableGeneric } from "@/components/TableGeneric";
import { sectionPagamentoColumns } from "@/columns/sectionPagamentoColumns";
import { PAGAMENTOS } from "@/lib/data";

export default function PagamentosPage() {
    return (
        <TableGeneric
            columns={sectionPagamentoColumns}
            data={PAGAMENTOS}
            title="Pagamentos"
        />
    );
}
```

* `PAGAMENTOS` é um array de objetos `Pagamento`.
* `TableGeneric` renderiza automaticamente todas as colunas definidas.

---

## 6. Pontos importantes

1. **Tipagem genérica**: `TableGeneric<T>` permite reutilizar a tabela para qualquer tipo de dados.
2. **Flexibilidade de células**: `cell` permite qualquer componente React, badges, tooltips ou botões.
3. **Estilização consistente**: usa Tailwind + components atômicos.
4. **Extensível**: você pode adicionar filtros, paginação ou ordenação usando TanStack Table.

---

## 7. Links Úteis

* [TanStack Table V8 Docs](https://tanstack.com/table/v8/docs/overview)
* [React Tooltip](https://www.radix-ui.com/docs/primitives/components/tooltip)
* [Tailwind CSS](https://tailwindcss.com/docs)
* [Lucide Icons](https://lucide.dev/)

---
