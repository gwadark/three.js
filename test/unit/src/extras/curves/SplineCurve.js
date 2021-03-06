/**
 * @author moraxy / https://github.com/moraxy
 */

QUnit.module( "SplineCurve", {

	before: function () {

		// Create a sine-like wave
		this.curve = new THREE.SplineCurve( [
			new THREE.Vector2( - 10, 0 ),
			new THREE.Vector2( - 5, 5 ),
			new THREE.Vector2( 0, 0 ),
			new THREE.Vector2( 5, - 5 ),
			new THREE.Vector2( 10, 0 )
		] );

	}

} );

QUnit.test( "Simple curve", function ( assert ) {

	var curve = this.curve;

	var expectedPoints = [
		new THREE.Vector2( - 10, 0 ),
		new THREE.Vector2( - 6.08, 4.56 ),
		new THREE.Vector2( - 2, 2.48 ),
		new THREE.Vector2( 2, - 2.48 ),
		new THREE.Vector2( 6.08, - 4.56 ),
		new THREE.Vector2( 10, 0 )
	];

	var points = curve.getPoints( 5 );

	assert.strictEqual( points.length, expectedPoints.length, "1st: Correct number of points" );

	points.forEach( function ( point, i ) {

		assert.numEqual( point.x, expectedPoints[ i ].x, "points[" + i + "].x" );
		assert.numEqual( point.y, expectedPoints[ i ].y, "points[" + i + "].y" );

	} );

	//

	points = curve.getPoints( 4 );

	assert.deepEqual( points, curve.points, "2nd: Returned points are identical to control points" );

} );

QUnit.test( "getLength/getLengths", function ( assert ) {

	var curve = this.curve;

	var length = curve.getLength();
	var expectedLength = 28.876950901868135;

	assert.numEqual( length, expectedLength, "Correct length of curve" );

	var expectedLengths = [
		0.0,
		Math.sqrt( 50 ),
		Math.sqrt( 200 ),
		Math.sqrt( 450 ),
		Math.sqrt( 800 )
	];

	var lengths = curve.getLengths( 4 );

	assert.deepEqual( lengths, expectedLengths, "Correct segment lengths" );

} );

QUnit.test( "getPointAt", function ( assert ) {

	var curve = this.curve;

	assert.ok( curve.getPointAt( 0 ).equals( curve.points[ 0 ] ), "PointAt 0.0 correct" );
	assert.ok( curve.getPointAt( 1 ).equals( curve.points[ 4 ] ), "PointAt 1.0 correct" );

	var pointAt = curve.getPointAt( 0.5 );
	assert.numEqual( pointAt.x, 0.0, "PointAt 0.5 x correct" );
	assert.numEqual( pointAt.y, 0.0, "PointAt 0.5 y correct" );

} );

QUnit.test( "getTangent", function ( assert ) {

	var curve = this.curve;

	var expectedTangent = [
		new THREE.Vector2( 0.7068243340243188, 0.7073891155729485 ), // 0
		new THREE.Vector2( 0.7069654305325396, - 0.7072481035902046 ), // 0.5
		new THREE.Vector2( 0.7068243340245123, 0.7073891155727552 ) // 1
	];

	var tangents = [
		curve.getTangent( 0 ),
		curve.getTangent( 0.5 ),
		curve.getTangent( 1 )
	];

	tangents.forEach( function ( tangent, i ) {

		assert.numEqual( tangent.x, expectedTangent[ i ].x, "tangent[" + i + "].x" );
		assert.numEqual( tangent.y, expectedTangent[ i ].y, "tangent[" + i + "].y" );

	} );

} );

QUnit.test( "getUtoTmapping", function ( assert ) {

	var curve = this.curve;

	var start = curve.getUtoTmapping( 0, 0 );
	var end = curve.getUtoTmapping( 0, curve.getLength() );
	var middle = curve.getUtoTmapping( 0.5, 0 );

	assert.strictEqual( start, 0, "getUtoTmapping( 0, 0 ) is the starting point" );
	assert.strictEqual( end, 1, "getUtoTmapping( 0, length ) is the ending point" );
	assert.numEqual( middle, 0.5, "getUtoTmapping( 0.5, 0 ) is the middle" );

} );

QUnit.test( "getSpacedPoints", function ( assert ) {

	var curve = this.curve;

	var expectedPoints = [
		new THREE.Vector2( - 10, 0 ),
		new THREE.Vector2( - 4.996509634683014, 4.999995128640857 ),
		new THREE.Vector2( 0, 0 ),
		new THREE.Vector2( 4.996509634683006, - 4.999995128640857 ),
		new THREE.Vector2( 10, 0 )
	];

	var points = curve.getSpacedPoints( 4 );

	assert.strictEqual( points.length, expectedPoints.length, "Correct number of points" );

	points.forEach( function ( point, i ) {

		assert.numEqual( point.x, expectedPoints[ i ].x, "points[" + i + "].x" );
		assert.numEqual( point.y, expectedPoints[ i ].y, "points[" + i + "].y" );

	} );

} );
