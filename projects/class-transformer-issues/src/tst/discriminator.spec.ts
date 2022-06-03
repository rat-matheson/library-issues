
import { Exclude, Expose, instanceToInstance, plainToInstance, Type } from "class-transformer";

export class FullName {
    public first?:string;
    public last?:string;
} 

export class LockedValue { 
    private readonly value:string;
    private readonly __type = "LockedValue";
    
    constructor(value:string) { 
        this.value = value;
    }

    public toString():string {
        return this.value;
    }
}

@Exclude()
export class User {
    @Type(() => FullName,  {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: "__type",
            subTypes: [
                { value: LockedValue, name: "LockedValue" },
            ]
        }
    })
    @Expose()
    public fullName?:FullName;
}


describe('class-transformer @Type discriminator', () => {
    it('should create a copy using plainToInstance when discrimnated field is null', async () => {
        let u = new User();
        u.fullName = null;
        
        let copy = plainToInstance(User, u);
        expect(copy == u).toBeFalse();
    })

    it('should create a copy using instanceToInstance when discrimnated field is null', async () => {
        let u = new User();
        u.fullName = null;
        let copy = instanceToInstance(u);

        expect(copy == u).toBeFalse();
    })
})