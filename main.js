const Arithmetic={
  Vector:class{
    constructor(x,y,z){
      this.x = x;
      this.y = y
      this.z = z;
    }
    #apply(param,oper="+",type="factor"){
      const vec={...this};
      for(const coord of ["x","y","z"]){
        if(type==="factor")eval(`vec.${coord}${oper}=param`);
        else if(type==="vector")eval(`vec.${coord}${oper}=param.${coord}`);
      }
      return new Arithmetic.Vector(vec.x,vec.y,vec.z);
    }
    sum(factor){return this.#apply(factor)}
    difference(factor){return this.#apply(factor,"-")}
    product(factor){return this.#apply(factor,"*")}
    ratio(factor){return this.#apply(factor,"/")}
    add(vec){return this.#apply(vec,"+","vector")}
    sub(vec){return this.#apply(vec,"-","vector")}
    mult(vec){return this.#apply(vec,"*","vector")}
    div(vec){return this.#apply(vec,"/","vector")}
  },
  Matrix:class{
    #matrix;constructor(rows,cols){
      this.rows = rows;
      this.cols = cols;
      this.length = rows*cols;
      this.#matrix = Array(rows).fill(null).map(()=>Array(cols).fill(0));
    }
    check(i,j){
      return i>0&&j>0&&i<=this.rows&&j<=this.cols;
    }
    get(i,j){if(this.check(i,j))return this.#matrix[i-1][j-1]}
    set(i,j,n){if(this.check(i,j))this.#matrix[i-1][j-1]=n;return this}
    getAll(){return this.#matrix}
    from(array){
      for(let k=0;k<this.length;k++){
        if(k<array.length)
          this.set(Math.floor(k/this.cols)+1,(k%this.cols)+1,array[k]);
      }return this;
    }
    #apply=(matrix,oper="+")=>{if(this.rows===matrix.rows&&this.cols===matrix.cols){
      const C=new Arithmetic.Matrix(this.rows,this.cols);
      for(let k=0;k<this.length;k++){
        const i=Math.floor(k/this.cols)+1,j=(k%this.cols)+1;
        if(oper==="+")C.set(i,j,A.get(i,j)+B.get(i,j));
        else if(oper==="-")C.set(i,j,A.get(i,j)-B.get(i,j));
      }
      return C;
    }return this}
    add(matrix){return this.#apply(matrix)}
    sub(matrix){return this.#apply(matrix,"-")}
    apply(func){
      for(let k=0;k<this.length;k++){
        const i=Math.floor(k/this.cols)+1,j=(k%this.cols)+1;
        this.set(i,j,func(this.get(i,j),i,j,k));
      }
      return this;
    }
    mult(matrix){if(this.cols===matrix.rows){
      const C=new Arithmetic.Matrix(this.rows,matrix.cols);
      for(let l=0;l<this.rows*matrix.cols;l++){
        const i=Math.floor(l/matrix.cols)+1,j=(l%matrix.cols)+1;
        for(let k=1;k<=this.cols;k++){
          C.set(i,j,C.get(i,j)+A.get(i,k)*B.get(k,j));
        }
      }return C;
    }return this}
  },
};
Object.freeze(Arithmetic);