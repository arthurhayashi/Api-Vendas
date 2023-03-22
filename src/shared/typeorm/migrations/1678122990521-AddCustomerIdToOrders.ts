import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1678122990521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orders_product',new TableColumn({
            name:'customer_id',
            type:'uuid',
            isNullable:true
        }));
        await queryRunner.createForeignKey('orders_product',
        new TableForeignKey({
            name:'OrdersCustomer',
            columnNames:['customer_id'],
            referencedTableName: 'customers',
            referencedColumnNames:['id'],
            onDelete:'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_product','OrdersCustomer');
        await queryRunner.dropColumn('orders_product','customer_id');
    }

}
