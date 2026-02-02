import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/atoms/badge";
import { CreditCard, Eye} from "lucide-react";
import {Pagamento} from "@/lib/data";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/atoms/tooltip";

export const sectionPagamentoColumns: ColumnDef<Pagamento>[] = [
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {

            return (
                <Badge
                    className={
                        row.original.estado === "Concluído"
                            ? "bg-green-300 text-green-700"
                            : "bg-red-300 text-red-700"
                    }
                >
                    {row.original.estado}
                </Badge>
            );
        },
    },

    {
        accessorKey: "alvara",
        header: "Alvara",
        cell: ({ row }) => {
            return (
               <p>{row.original.alvara}</p>
            );
        },
    },

    {
        accessorKey: "processo",
        header: "Processo",
        cell: ({ row }) => (
            <p>{row.original.processo}</p>
        ),
    },

    {
        accessorKey: "valor",
        header: "Valor",
        cell: ({ row }) => (
            <p>{row.original.valor}</p>
        ),
    },

    {
        accessorKey: "tipo",
        header: "Tipo",
        cell: ({ row }) => (
            <p>{row.original.tipo}</p>
        ),
    },

    {
        accessorKey: "data_registro",
        header: "Data Registro",
        cell: ({ row }) => (
            <p>{row.original.data_registro}</p>
        ),
    },

    {
        accessorKey: "data_prev_pag",
        header: "Data Prev.Pag",
        cell: ({ row }) => (
            <p>{row.original.data_prev_pag}</p>
        ),
    },

    {
        accessorKey: "data_pagamento",
        header: "Data Pagamento",
        cell: ({ row }) => (
            <p>{row.original.data_pagamento}</p>
        ),
    },

    {
        accessorKey: "parcela_n",
        header: "parcela Nº",
        cell: ({ row }) => (
            <p>{row.original.parcela_n}</p>
        ),
    },

    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => {

            return (
               <>
                   {row.original.estado === "Concluído" ? (
                       <Tooltip>
                           <TooltipTrigger asChild className='cursor-pointer'>
                               <Eye className='w-4 h-4 font-light'/>
                           </TooltipTrigger>
                           <TooltipContent>
                               <p>Ver Detalhe de Pagamento</p>
                           </TooltipContent>
                       </Tooltip>
                   ) : (
                      <div className='flex gap-2'>
                          <Tooltip>
                              <TooltipTrigger asChild className='cursor-pointer'>
                                  <Eye className='w-4 h-4 font-light'/>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p>Ver Detalhe de Pagamento</p>
                              </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                              <TooltipTrigger asChild className='cursor-pointer'>
                                  <CreditCard className='w-4 h-4 font-light'/>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p>Pagar Agora</p>
                              </TooltipContent>
                          </Tooltip>
                      </div>
                   )}
               </>
            );
        },
    },
];
