'use client';
import { Button } from '../Button';
import { Select } from '../Select';
import { cn } from '../../../lib/utils';
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, DotsThree } from '@phosphor-icons/react';
import {
    PaginatorEllipsisProps,
    PaginatorFirstProps,
    PaginatorLastProps,
    PaginatorNextProps,
    PaginatorPageProps,
    PaginatorPagesInstance,
    PaginatorPagesProps,
    PaginatorPrevProps,
    PaginatorRootProps,
    Paginator as PRPaginator
} from 'primereact/paginator';

function PaginatorPages({ className, children, activePage, ...props }: PaginatorPagesProps & { activePage?: number }) {
    return (
        <PRPaginator.Pages className={cn('flex flex-wrap items-center gap-1', className)} {...props}>
            {children ?? (({ paginator }: PaginatorPagesInstance) => paginator?.pages.map((page, index) => {
                // PrimeReact Headless exposes activePage either directly on the instance, or inside the state object
                const current = activePage ?? (paginator as any).state?.activePage ?? (paginator as any).activePage ?? 1;
                const isActive = page.value === current;
                return page.type === 'page' ? (
                    <PaginatorPage 
                        key={`page-${page.value}`} 
                        value={page.value} 
                        className={isActive ? '!bg-primary !text-white hover:!bg-primary' : 'text-content-main hover:bg-surface'}
                    />
                ) : (
                    <PaginatorEllipsis key={`ellipsis-${index}`} />
                );
            }))}
        </PRPaginator.Pages>
    );
}

function PaginatorPage({ className, ...props }: PaginatorPageProps) {
    return <PRPaginator.Page as={Button} iconOnly size="sm" variant="text" className={cn('font-normal size-9 rounded-lg', className)} {...props} />;
}

function PaginatorEllipsis({ className, children, ...props }: PaginatorEllipsisProps) {
    return (
        <PRPaginator.Ellipsis className={cn('text-content-sub size-9 inline-flex items-center justify-center', className)} {...props}>
            {children ?? <DotsThree size={16} />}
        </PRPaginator.Ellipsis>
    );
}

function PaginatorFirst({ className, children, ...props }: PaginatorFirstProps) {
    return (
        <PRPaginator.First as={Button} iconOnly size="sm" variant="text" className={cn('size-9', className)} {...props}>
            {children ?? <CaretDoubleLeft size={16} />}
        </PRPaginator.First>
    );
}

function PaginatorLast({ className, children, ...props }: PaginatorLastProps) {
    return (
        <PRPaginator.Last as={Button} iconOnly size="sm" variant="text" className={cn('size-9', className)} {...props}>
            {children ?? <CaretDoubleRight size={16} />}
        </PRPaginator.Last>
    );
}

function PaginatorPrev({ className, children, ...props }: PaginatorPrevProps) {
    return (
        <PRPaginator.Prev as={Button} iconOnly size="sm" variant="text" className={cn('size-9 disabled:hidden data-[disabled]:hidden', className)} {...props}>
            {children ?? <CaretLeft size={16} />}
        </PRPaginator.Prev>
    );
}

function PaginatorNext({ className, children, ...props }: PaginatorNextProps) {
    return (
        <PRPaginator.Next as={Button} iconOnly size="sm" variant="text" className={cn('size-9 disabled:hidden data-[disabled]:hidden', className)} {...props}>
            {children ?? <CaretRight size={16} />}
        </PRPaginator.Next>
    );
}

export interface PaginatorProps extends Omit<PaginatorRootProps, 'onPageChange'> {
    first: number;
    rows: number;
    totalRecords: number;
    rowsPerPageOptions?: number[];
    onPageChange?: (e: { first: number; rows: number; page: number; pageCount?: number }) => void;
    className?: string;
    itemName?: string;
}

export function Paginator({
    className,
    first,
    rows,
    totalRecords,
    rowsPerPageOptions = [10, 20, 30, 50],
    onPageChange,
    itemName = 'mục',
    ...props
}: PaginatorProps) {
    const selectOptions = rowsPerPageOptions.map((opt) => ({
        label: `${opt} / trang`,
        value: opt,
    }));

    return (
        <div className={cn('p-4 flex items-center justify-between text-sm text-content-main w-full', className)}>
            <div>
                {totalRecords} {itemName}
            </div>
            
            <div className="flex items-center gap-2">
                <PRPaginator.Root 
                    page={Math.floor(first / rows) + 1} 
                    itemsPerPage={rows} 
                    total={totalRecords} 
                    onPageChange={(e: { value: number }) => onPageChange?.({ first: (e.value - 1) * rows, rows: rows, page: e.value - 1 })}
                    {...props}
                >
                    <PRPaginator.Content className="flex items-center justify-center flex-wrap gap-2">
                        <PaginatorPrev />
                        <PaginatorPages activePage={Math.floor(first / rows) + 1} />
                        <PaginatorNext />
                    </PRPaginator.Content>
                </PRPaginator.Root>

                <div className="ml-4 w-[120px]">
                    <Select
                        value={rows}
                        options={selectOptions}
                        onChange={(e) => onPageChange?.({ first: 0, rows: Number(e.value), page: 0 })}
                    />
                </div>
            </div>
        </div>
    );
}

export { PaginatorEllipsis, PaginatorFirst, PaginatorLast, PaginatorNext, PaginatorPage, PaginatorPages, PaginatorPrev };
