'use client'
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { categories } from '../utils/categories';
import Category from './Category';
import Container from './ui/container';

const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname == '/'
    if (!isMainPage) return null
    return (
        <Container>
            <div>
                {categories.map((item) => (
                    <Category
                        key={item.label}
                        label={item.label}
                        selected={category == item.label || (category == null &&
                            item.label == 'All'
                        )}
                    />
                ))}
            </div>
        </Container>
    )
}
export default Categories
