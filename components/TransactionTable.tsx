import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants'

const CategoryBadge = ({category}: CategoryBadgeProps) => {

  const {borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor} = 
         transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default

  return (
    <div className={cn('category-badge', borderColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)}/>
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
}  

const TransactionTable = ({transactions} : TransactionTableProps) => {
  return (
    <Table>
  <TableHeader className='bg-[#f9fafb]'>
    <TableRow>
      <TableHead className="text-[12px]">Transactions</TableHead>    
      <TableHead className="text-[12px]">Amout</TableHead>    
      <TableHead className="text-[12px]">Status</TableHead>    
      <TableHead className="text-[12px]">Date</TableHead>    
      {/* <TableHead className="text-[12px] max-md:hidden">Channel</TableHead>     */}
      <TableHead className="text-[12px] max-md:hidden">Category</TableHead>    
      </TableRow>
  </TableHeader>
  <TableBody>
   {transactions.map((t: Transaction) => {
    const status = getTransactionStatus(new Date(t.date));
    const amount = formatAmount(t.amount);

    const isDebit = t.type === 'debit';
    const isCredit = t.type === 'credit';

    return (
        <TableRow key={t.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
            <TableCell className='max-w-[250px] '>
                <div className='flex items-center gap-3'>
                    <h1 className='text-[12px] truncate font-semibold text-[#344054]'>
                        {removeSpecialCharacters(t.name)}
                    </h1>
                </div>
            </TableCell>
            <TableCell className={`  font-semibold text-[12px] ${isDebit || amount[0] === '-' ? 'text-red-500': 'text-[#039855]' }`} >
              {isDebit ? `-${amount}` : isCredit ? amount : amount}
            </TableCell>

            <TableCell className='text-[12px]'>
              <CategoryBadge category={status} />
            </TableCell>

            <TableCell className='min-w-32 text-[12px]'>
              {formatDateTime(new Date(t.date)).dateTime}
            </TableCell>

            {/* <TableCell className=' capitalize min-w-24 text-[12px] '>
              {t.paymentChannel}
            </TableCell> */}

            <TableCell className=' max-md:hidden text-[12px]'>
              <CategoryBadge category={t.category} />
            </TableCell>
        </TableRow>
    )
   })}
  </TableBody>
</Table>

  )
}

export default TransactionTable